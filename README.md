### Entities :

- User :

```
id : number
email : string
username : string
password : string
salt : string // This is saved in database and not sent when exchanging data.
role : UserRoleEnum //Can be ROLE:USER or ROLE:ADMIN at the moment.
equipment : Equipment[] //One to many with equipment table. The equipment that this user manages at the moment.
```

- Equipment :

```
id : number
prop_client : boolean //Indicates if this equipment is client sourced or not.
label : string
status : boolean
manager : User //The user responsable for this equipment at the moment can be null.
defaults : string
date_res : Date
date_lib : Date
description : string

```

- History :

```
id : number
prop_client : boolean //Indicates if this equipment is client sourced or not.
label : string
status : boolean
user : User //The user concerned with said taking.
equipment : Equipment //The equipment concerned with said taking.
defaults : string
date_res : Date
date_lib : Date
description : string

```
