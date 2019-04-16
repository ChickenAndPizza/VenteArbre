drop database if exists VenteArbre;
create database VenteArbre;
use VenteArbre;

#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: distribution_point
#------------------------------------------------------------

CREATE TABLE distribution_point(
        id                Varchar (36) NOT NULL ,
        map_link		  Text ,
        web_link          Varchar (254) ,
        web_name		  Varchar (254) NOT NULL ,
        description 	  Text NOT NULL ,	
        is_active         Bool NOT NULL
	,CONSTRAINT distribution_point_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


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
        is_admin     Bool NOT NULL,
        is_active   Bool NOT NULL
	,CONSTRAINT customer_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: customer_order
#------------------------------------------------------------

CREATE TABLE customer_order(
        id               	  Varchar (36) NOT NULL ,
        transaction_date 	  Date ,
        state            	  TinyINT NOT NULL ,
        id_customer      	  Varchar (36) NOT NULL,
        id_distribution_point Varchar(36),
        total                 Decimal(10, 2) NOT NULL,
        is_active        	  Bool NOT NULL
	,CONSTRAINT customer_order_PK PRIMARY KEY (id)

	,CONSTRAINT customer_order_customer_FK FOREIGN KEY (id_customer) REFERENCES customer(id)
    ,CONSTRAINT customer_order_id_distribution_point_FK FOREIGN KEY (id_distribution_point) REFERENCES distribution_point(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: supplier
#------------------------------------------------------------

CREATE TABLE supplier(
        id           Varchar (36) NOT NULL ,
        name         Varchar (100) NOT NULL ,
        phone_number Varchar (10) NOT NULL ,
        email        Varchar (10) NOT NULL,
        is_active    Bool NOT NULL
	,CONSTRAINT supplier_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: supplier_order
#------------------------------------------------------------

CREATE TABLE supplier_order(
        id               Varchar (36) NOT NULL ,
        transaction_date Date NOT NULL ,
        id_customer      Varchar (36) NOT NULL ,
        id_supplier      Varchar (36) NOT NULL,
        is_active        Bool NOT NULL
	,CONSTRAINT supplier_order_PK PRIMARY KEY (id)

	,CONSTRAINT supplier_order_customer_FK FOREIGN KEY (id_customer) REFERENCES customer(id)
	,CONSTRAINT supplier_order_supplier_FK FOREIGN KEY (id_supplier) REFERENCES supplier(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: tree_category
#------------------------------------------------------------


CREATE TABLE tree_category(
        id          Varchar (36) NOT NULL ,
        description Varchar (254) NOT NULL,
		is_active   Bool NOT NULL
	,CONSTRAINT tree_category_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: tree
#------------------------------------------------------------

CREATE TABLE tree(
        id          	     Varchar (36) NOT NULL ,
        name        	     Varchar (100) NOT NULL ,
        zone        	     Varchar (20) NOT NULL ,
        age_height           Varchar (20) NOT NULL ,
        price       	     Decimal(10, 2) NOT NULL,
        description 	     TEXT NOT NULL ,
		id_tree_category 	 Varchar (36) NOT NULL,
		is_active   		 Bool NOT NULL,
        image                mediumblob
	,CONSTRAINT tree_PK PRIMARY KEY (id)

	,CONSTRAINT tree_category_FR FOREIGN KEY (id_tree_category) REFERENCES tree_category(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: customer_order_detail
#------------------------------------------------------------

CREATE TABLE customer_order_detail(
        id                Varchar (36) NOT NULL ,
        quantity          Int NOT NULL ,
        id_tree           Varchar (36) NOT NULL ,
        id_customer_order Varchar (36) NOT NULL,
        price             Decimal(10,2) NOT NULL,
        is_active         Bool NOT NULL
	,CONSTRAINT customer_order_detail_PK PRIMARY KEY (id)

	,CONSTRAINT customer_order_detail_tree_FK FOREIGN KEY (id_tree) REFERENCES tree(id)
	,CONSTRAINT customer_order_detail_customer_order_FK FOREIGN KEY (id_customer_order) REFERENCES customer_order(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: supplier_order_detail
#------------------------------------------------------------

CREATE TABLE supplier_order_detail(
        id                Varchar (36) NOT NULL ,
        quantity          Int NOT NULL ,
        id_supplier_order Varchar (36) NOT NULL ,
        id_tree           Varchar (36) NOT NULL,
        is_active         Bool NOT NULL
	,CONSTRAINT supplier_order_detail_PK PRIMARY KEY (id)

	,CONSTRAINT supplier_order_detail_supplier_order_FK FOREIGN KEY (id_supplier_order) REFERENCES supplier_order(id)
	,CONSTRAINT supplier_order_detail_tree_FK FOREIGN KEY (id_tree) REFERENCES tree(id)
)ENGINE=InnoDB;