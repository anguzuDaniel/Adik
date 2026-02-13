import re
import os

input_file = r"c:\Users\kenyi\OneDrive\Desktop\projects\Adik\db_cluster-30-03-2025@12-26-10.backup"
output_file = r"c:\Users\kenyi\OneDrive\Desktop\projects\Adik\cleaned_backup.sql"

def is_safe(stmt):
    s = stmt.strip()
    if not s: return False
    
    # Strip comments to find the actual keyword
    s_clean = re.sub(r"--.*", "", s).strip()
    if not s_clean: return False

    # Essential session settings
    if s_clean.startswith("SET ") or s_clean.startswith("SELECT pg_catalog.set_config"):
        if "OWNER TO" in s_clean or "ROLE" in s_clean: return False
        return True
    
    # Handle setval specifically
    if s_clean.startswith("SELECT pg_catalog.setval"):
        if re.search(r"\b\"?public\"?\.", s_clean, re.IGNORECASE):
            return True
        return False
    
    # Check if the statement targets the public schema
    if re.search(r"\b\"?public\"?\.", s_clean, re.IGNORECASE):
        # Exclude roles and non-public schema creation
        if re.match(r"^\s*(ALTER .* OWNER TO|GRANT|REVOKE|CREATE ROLE|ALTER ROLE|\\connect|ALTER DEFAULT PRIVILEGES)", s_clean, re.IGNORECASE):
            return False
        # Double check it doesn't target system schemas
        if re.search(r"CREATE (FUNCTION|TYPE|VIEW|TABLE|SEQUENCE|TRIGGER) (auth|extensions|realtime|pgbouncer|pgsodium|storage|vault|graphql|graphql_public)\.", s_clean, re.IGNORECASE):
            return False
        return True
    
    return False

def flush(stmt_list, out, seen_stmts):
    stmt = "".join(stmt_list).strip()
    if not stmt.endswith(";"): stmt += ";"
    
    if is_safe(stmt):
        if stmt not in seen_stmts:
            out.write(stmt + "\n\n")
            seen_stmts.add(stmt)

def clean_sql():
    seen_stmts = set()
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f, \
         open(output_file, 'w', encoding='utf-8') as out:
        
        current_statement = []
        in_copy = False
        
        for line in f:
            stripped = line.strip()
            if not stripped and not in_copy: continue
            
            if not in_copy and stripped.startswith("COPY "):
                if current_statement:
                    flush(current_statement, out, seen_stmts)
                    current_statement = []
                
                if re.search(r"\b\"?public\"?\.", stripped):
                    out.write(line)
                    in_copy = True
                else:
                    # Skip this COPY block
                    for l in f:
                        if l.strip() == "\\.":
                            break
                continue

            if in_copy:
                out.write(line)
                if stripped == "\\.":
                    in_copy = False
                continue

            current_statement.append(line)
            if stripped.endswith(";"):
                total_content = "".join(current_statement)
                if total_content.count("$$") % 2 == 0:
                    flush(current_statement, out, seen_stmts)
                    current_statement = []

        if current_statement:
            flush(current_statement, out, seen_stmts)

if __name__ == "__main__":
    clean_sql()
    print(f"Cleaned SQL saved to {output_file}")
