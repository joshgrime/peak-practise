var snowflake = require('snowflake-sdk');

var connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    application: process.env.SNOWFLAKE_APPLICATION
});

connection.connect( 
    function(err, conn) {
        if (err) {
            console.error('Unable to connect: ' + err.message);
            } 
        else {
            console.log('Successfully connected to Snowflake.');
            connection_ID = conn.getId();
            makeQuery(connection_ID);
        }
    }
);

function makeQuery(){
    connection.execute({
    sqlText: `SELECT * from ${process.env.SNOWFLAKE_DATABASE}.STAGE.PRODUCTS_TABLE limit 100;`,
    complete: function(err, stmt, rows) {
        if (err) {
        console.error('Failed to execute statement due to the following error: ' + err.message);
        } else {
        console.log('Successfully executed statement: ' + stmt.getSqlText());
        console.log(JSON.stringify(rows, null, 4));
        }
    }
    });
}
