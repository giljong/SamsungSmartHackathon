DROP DATABASE IF EXISTS SSH;

CREATE DATABASE SSH;
USE SSH;

CREATE TABLE Users(
    PW VARCHAR(100),
    EMAIL VARCHAR(100) NOT NULL PRIMARY KEY,
    FLAG INT DEFAULT 0,
    AUTHKEY VARCHAR(100),
    TEA INT DEFAULT 0,
    SCORE INT DEFAULT 0,
    CLASS INT,
    USERNAME VARCHAR(100),
    GRADE VARCHAR(100)
);

CREATE TABLE OXQUIZ(
    PKEY VARCHAR(100),
    CONTENTS VARCHAR(5000) NOT NULL,
    CNT INT, 
    ANSWER INT, 
    CON1 VARCHAR(100),
    CON2 VARCHAR(100),
    TITLE VARCHAR(100)
);

CREATE TABLE Games(
    PKEY VARCHAR(100) PRIMARY KEY,
    MAXCNT INT,
    TITLE VARCHAR(100),
    CATEGORIZE VARCHAR(100),
    USER VARCHAR(100)
);

CREATE TABLE Ranking(
    PKEY VARCHAR(100), 
    SCORE VARCHAR(100),
    USER VARCHAR(100) 
);

CREATE TABLE ANSWERS(
    ANSWER VARCHAR(100),
    PKEY VARCHAR(100),
    USER VARCHAR(100),
    CNT INT,
    CONFIRM VARCHAR(10),
    TITLE VARCHAR(100)
);

CREATE TABLE TEST(
    PKEY VARCHAR(100), 
    CONTENTS VARCHAR(5000) NOT NULL, 
    CNT INT, 
    ANSWER INT,
    CON1 VARCHAR(100),
    CON2 VARCHAR(100),
    CON3 VARCHAR(100),
    CON4 VARCHAR(100),
    TITLE VARCHAR(100)
);