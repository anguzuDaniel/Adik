--
-- PostgreSQL database cluster dump
--
SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SELECT pg_catalog.set_config('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;

--
-- Name: report_status_enum; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public.report_status_enum AS ENUM (
    'PENDING',
    'RESOLVED'
);

--
-- Name: report_type_enum; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public.report_type_enum AS ENUM (
    'USER',
    'COMMUNITY'
);

--
-- Name: resource_type_enum; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public.resource_type_enum AS ENUM (
    'ARTICLE',
    'VIDEO',
    'PODCAST'
);

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public.user_role_enum AS ENUM (
    'ADMIN',
    'USER'
);

--
-- Name: users_recoverystage_enum; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public.users_recoverystage_enum AS ENUM (
    'Pre-contemplation',
    'Contemplation',
    'Preparation',
    'Action',
    'Maintenance'
);

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public.users_role_enum AS ENUM (
    'ADMIN',
    'USER'
);

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: community; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.community (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "isActive" boolean NOT NULL,
    member_number integer NOT NULL,
    description text NOT NULL,
    rating double precision NOT NULL,
    "groupTags" text NOT NULL,
    "adminId" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone
);

--
-- Name: community_members_users; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.community_members_users (
    "communityId" uuid NOT NULL,
    "usersId" uuid NOT NULL
);

--
-- Name: journal; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.journal (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    content text NOT NULL,
    "sentimentScore" double precision,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL
);

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.messages (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "senderId" character varying NOT NULL,
    "receiverId" character varying NOT NULL,
    content character varying NOT NULL,
    "parentId" character varying,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);

--
-- Name: report; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.report (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    type public.report_type_enum NOT NULL,
    "reporterId" uuid NOT NULL,
    "reportedUserId" uuid,
    "reportedCommunityId" uuid,
    reason text NOT NULL,
    status public.report_status_enum DEFAULT 'PENDING'::public.report_status_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: resource; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.resource (
    id integer NOT NULL,
    title character varying NOT NULL,
    type public.resource_type_enum DEFAULT 'ARTICLE'::public.resource_type_enum NOT NULL,
    url character varying NOT NULL
);

--
-- Name: resource_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE public.resource_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE public.resource_id_seq OWNED BY public.resource.id;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.users (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    role character varying DEFAULT 'USER'::character varying NOT NULL,
    "recoveryStage" character varying DEFAULT 'Pre-contemplation'::character varying NOT NULL
);

--
-- Name: resource id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.resource ALTER COLUMN id SET DEFAULT nextval('public.resource_id_seq'::regclass);

COPY public.community (id, name, "isActive", member_number, description, rating, "groupTags", "adminId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.
COPY public.community_members_users ("communityId", "usersId") FROM stdin;
\.
COPY public.journal (id, content, "sentimentScore", "createdAt", user_id) FROM stdin;
\.
COPY public.messages (id, "senderId", "receiverId", content, "parentId", "timestamp") FROM stdin;
\.
COPY public.report (id, type, "reporterId", "reportedUserId", "reportedCommunityId", reason, status, "createdAt") FROM stdin;
\.
COPY public.resource (id, title, type, url) FROM stdin;
\.
COPY public.users (id, username, email, role, "recoveryStage") FROM stdin;
18817143-257f-4bde-9563-d1b86b0f4be5	anguzudaniel1	anguzudaniel1@gmail.com	USER	Pre-contemplation
\.
--
-- Name: resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('public.resource_id_seq', 1, false);

--
-- Name: messages PK_18325f38ae6de43878487eff986; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY (id);

--
-- Name: journal PK_396f862c229742e29f888b1abce; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.journal
    ADD CONSTRAINT "PK_396f862c229742e29f888b1abce" PRIMARY KEY (id);

--
-- Name: community_members_users PK_6a91ba9121810b6a34e02cf1da6; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.community_members_users
    ADD CONSTRAINT "PK_6a91ba9121810b6a34e02cf1da6" PRIMARY KEY ("communityId", "usersId");

--
-- Name: report PK_99e4d0bea58cba73c57f935a546; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.report
    ADD CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY (id);

--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);

--
-- Name: community PK_cae794115a383328e8923de4193; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.community
    ADD CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY (id);

--
-- Name: resource PK_e2894a5867e06ae2e8889f1173f; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.resource
    ADD CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY (id);

--
-- Name: users UQ_772886e2f1f47b9ceb04a06e203; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE (username, email);

--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);

--
-- Name: IDX_3e8eb0e5abdecc0b12bb5b2f4d; Type: INDEX; Schema: public; Owner: postgres
--
CREATE INDEX "IDX_3e8eb0e5abdecc0b12bb5b2f4d" ON public.community_members_users USING btree ("communityId");

--
-- Name: IDX_68027a4399e1360c0114a886ca; Type: INDEX; Schema: public; Owner: postgres
--
CREATE INDEX "IDX_68027a4399e1360c0114a886ca" ON public.community_members_users USING btree ("usersId");

--
-- Name: community_members_users FK_3e8eb0e5abdecc0b12bb5b2f4d5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.community_members_users
    ADD CONSTRAINT "FK_3e8eb0e5abdecc0b12bb5b2f4d5" FOREIGN KEY ("communityId") REFERENCES public.community(id) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- Name: report FK_62613e4fe952eceafcfcd37eb4c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.report
    ADD CONSTRAINT "FK_62613e4fe952eceafcfcd37eb4c" FOREIGN KEY ("reportedCommunityId") REFERENCES public.community(id);

--
-- Name: community_members_users FK_68027a4399e1360c0114a886ca9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.community_members_users
    ADD CONSTRAINT "FK_68027a4399e1360c0114a886ca9" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- Name: report FK_9bcc42f31a07ba2ec734bfa7dd0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.report
    ADD CONSTRAINT "FK_9bcc42f31a07ba2ec734bfa7dd0" FOREIGN KEY ("reportedUserId") REFERENCES public.users(id);

--
-- Name: journal FK_a9a9bdf7f08476e575bd053f5d9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.journal
    ADD CONSTRAINT "FK_a9a9bdf7f08476e575bd053f5d9" FOREIGN KEY (user_id) REFERENCES public.users(id);

