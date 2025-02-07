/* eslint-disable */
export default async () => {
    const t = {
        ["./enums/Role.js"]: await import("./enums/Role.js")
    };
    return {
        "@nestjs/swagger":
          {
              "models":
                [[import("./entities/users.entity.js"), { "Users": { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, role: { required: true, enum: t["./enums/Role.js"].Role }, password: { required: true, type: () => String, minLength: 1 } } }]], "controllers": [[import("./app.controller.js"), { "AppController": { "getHello": { type: String } } }]] } };
};