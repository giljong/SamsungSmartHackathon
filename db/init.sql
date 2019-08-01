DROP DATABASE IF EXISTS SSH;

CREATE DATABASE SSH;
USE SSH;

CREATE TABLE Users(
    PW VARCHAR(100),
    EMAIL VARCHAR(100) NOT NULL PRIMARY KEY,
    FLAG INT DEFAULT 0,
    AUTHKEY VARCHAR(100),
    TEA INT DEFAULT 0,
    SCORE INT DEFAULT 0
);

CREATE TABLE OXQUIZ(
    PKEY VARCHAR(100), --문제의 고유키
    CONTENTS VARCHAR(5000) NOT NULL, --문제의 내용
    CNT INT, -- 문항의 번호
    ANSWER INT -- 답은 0과 1로 구분
);

CREATE TABLE Games(
    PKEY VARCHAR(100) PRIMARY KEY, --문제의 고유키
    CATEGORIZE VARCHAR(100),
    TITLE VARCHAR(100) --게임의 제목   
);

CREATE TABLE Rank(
    PKEY VARCHAR(100), --문제의 고유키
    SCORE VARCHAR(100), -- 유저의 점수
    USER VARCHAR(100) -- 유저네임
);