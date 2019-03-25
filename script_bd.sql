drop database if exists VenteArbre;
create database VenteArbre;
use VenteArbre;

#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: customer
#------------------------------------------------------------

CREATE TABLE customer(
        id           Varchar (36) NOT NULL ,
        first_name   Varchar (30) NOT NULL ,
        last_name    Varchar (30) NOT NULL ,
        email        Varchar (80) NOT NULL ,
        phone_number Varchar (10) NOT NULL ,
	password     Varchar (30) NOT NULL ,
        is_admin     Bool NOT NULL
	,CONSTRAINT customer_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: customer_order
#------------------------------------------------------------

CREATE TABLE customer_order(
        id               Varchar (36) NOT NULL ,
        transaction_date Date NOT NULL ,
        state            TinyINT NOT NULL ,
        id_customer      Varchar (36) NOT NULL
	,CONSTRAINT customer_order_PK PRIMARY KEY (id)

	,CONSTRAINT customer_order_customer_FK FOREIGN KEY (id_customer) REFERENCES customer(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: supplier
#------------------------------------------------------------

CREATE TABLE supplier(
        id           Varchar (36) NOT NULL ,
        name         Varchar (100) NOT NULL ,
        phone_number Varchar (10) NOT NULL ,
        email        Varchar (10) NOT NULL
	,CONSTRAINT supplier_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: supplier_order
#------------------------------------------------------------

CREATE TABLE supplier_order(
        id               Varchar (36) NOT NULL ,
        transaction_date Date NOT NULL ,
        id_customer      Varchar (36) NOT NULL ,
        id_supplier      Varchar (36) NOT NULL
	,CONSTRAINT supplier_order_PK PRIMARY KEY (id)

	,CONSTRAINT supplier_order_customer_FK FOREIGN KEY (id_customer) REFERENCES customer(id)
	,CONSTRAINT supplier_order_supplier0_FK FOREIGN KEY (id_supplier) REFERENCES supplier(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: tree_category
#------------------------------------------------------------


CREATE TABLE tree_category(
        id          Varchar (36) NOT NULL ,
        description Varchar (254) NOT NULL
	,CONSTRAINT tree_category_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: tree_sub_category
#------------------------------------------------------------


CREATE TABLE tree_sub_category(
        id          Varchar (36) NOT NULL ,
        description Varchar (254) NOT NULL ,
  	id_tree_category VARCHAR(36) NOT NULL
	,CONSTRAINT tree_sub_category_PK PRIMARY KEY (id)

	,CONSTRAINT tree_sub_category_tree_category_FR FOREIGN KEY (id_tree_category) REFERENCES tree_category(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: tree
#------------------------------------------------------------

CREATE TABLE tree(
        id          	     Varchar (36) NOT NULL ,
        name        	     Varchar (100) NOT NULL ,
        description 	     Varchar (254) NOT NULL ,
        price       	     Decimal NOT NULL,
	id_tree_sub_category Varchar (36) NOT NULL
	,CONSTRAINT tree_PK PRIMARY KEY (id)

	,CONSTRAINT tree_tree_sub_category_FR FOREIGN KEY (id_tree_sub_category) REFERENCES tree_sub_category(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: customer_order_detail
#------------------------------------------------------------

CREATE TABLE customer_order_detail(
        id                Varchar (36) NOT NULL ,
        quantity          Int NOT NULL ,
        id_tree           Varchar (36) NOT NULL ,
        id_customer_order Varchar (36) NOT NULL
	,CONSTRAINT customer_order_detail_PK PRIMARY KEY (id)

	,CONSTRAINT customer_order_detail_tree_FK FOREIGN KEY (id_tree) REFERENCES tree(id)
	,CONSTRAINT customer_order_detail_customer_order0_FK FOREIGN KEY (id_customer_order) REFERENCES customer_order(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: supplier_order_detail
#------------------------------------------------------------

CREATE TABLE supplier_order_detail(
        id                Varchar (36) NOT NULL ,
        quantity          Int NOT NULL ,
        id_supplier_order Varchar (36) NOT NULL ,
        id_tree           Varchar (36) NOT NULL
	,CONSTRAINT supplier_order_detail_PK PRIMARY KEY (id)

	,CONSTRAINT supplier_order_detail_supplier_order_FK FOREIGN KEY (id_supplier_order) REFERENCES supplier_order(id)
	,CONSTRAINT supplier_order_detail_tree0_FK FOREIGN KEY (id_tree) REFERENCES tree(id)
)ENGINE=InnoDB;

