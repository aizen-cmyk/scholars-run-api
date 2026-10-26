console.table([
  { Action: "List",     "Verb and URL": "GET /question-sets",         "Sequelize call": "Model.findAll({ where })", Success: "200, an array",           "Can fail with": "401, 403" },
  { Action: "Read one", "Verb and URL": "GET /question-sets/{id}",    "Sequelize call": "Model.findByPk(id)",       Success: "200, one object",         "Can fail with": "400, 403, 404" },
  { Action: "Create",   "Verb and URL": "POST /question-sets",        "Sequelize call": "Model.create(data)",       Success: "201, the new object",     "Can fail with": "400, 409" },
  { Action: "Update",   "Verb and URL": "PATCH /question-sets/{id}",  "Sequelize call": "row.update(changes)",      Success: "200, the changed object", "Can fail with": "400, 403, 404, 409" },
  { Action: "Delete",   "Verb and URL": "DELETE /question-sets/{id}", "Sequelize call": "row.destroy()",            Success: "204, no body",            "Can fail with": "400, 403, 404, 409" },
]);