/*
--- run at docker ---
$docker compose --profile box-crack up --build -d
$docker compose logs node_app
*/
console.log('Cracking ....');

const func_v1 = require('./tried/01-func/func-v1');
func_v1();

