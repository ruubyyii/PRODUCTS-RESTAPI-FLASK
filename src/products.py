import mysql.connector
mysql = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="tienda",
    port=3306)

def getProducts():
    cursor = mysql.cursor(dictionary=True)
    cursor.execute("SELECT * FROM informatica")
    products = cursor.fetchall()
    cursor.close()
    return products

