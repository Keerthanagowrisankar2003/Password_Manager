# 🎯 Password Manager
- The Password Manager Project is a secure, web-based application designed to help users generate, save, and manage their passwords efficiently. 

- It provides a user-friendly interface for managing passwords, ensuring users can store and retrieve their credentials with ease.

## ER DIAGRAM
## ![ER DIAGRAM FOR PASSWORD](Visual_Assets/Password_/Manager.png)
## `NORMALISATION:`
- ### 1NF:
    - ✔ Each table has its own `primary key`

    - ✔ There is no '`atomic`'(indivisible) value

- ### 2NF:
    - ✔Follows 1NF.

    - ✔There is no partial `depencies`(no `primary key` determines some other attributes.)

- ### 3NF:
    - ✔Follows 3NF.

    - ✔There is no transitive `depencies`(no non-key attribute determines some other attribute).

- ### 4NF:
    - ✔ Follows 4NF.

    - ✔ No multi-valued `depencies`.

Since these all the four Normalisation are followed by our table,the table is in the normalisation form.


## API CALLS NEEDED
- SIGN UP:

    - E-mail Id

    - Password

- LOGIN:

   - Email Id

    - password

- To display the names of the website:
Request:
    - 


