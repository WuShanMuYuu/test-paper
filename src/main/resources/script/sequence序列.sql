--1.创建sequence表
CREATE TABLE `sequence` (
                            `name` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '序列的名字',
                            `current_value` int(11) NOT NULL COMMENT '序列的当前值',
                            `increment` int(11) NOT NULL DEFAULT '1' COMMENT '序列的自增值',
                            PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

##2.创建–取当前值的函数
DROP FUNCTION IF EXISTS currval;
DELIMITER $
CREATE FUNCTION currval (seq_name VARCHAR(50))
    RETURNS INTEGER
    LANGUAGE SQL
    DETERMINISTIC
    CONTAINS SQL
    SQL SECURITY DEFINER
    COMMENT ''
BEGIN
    DECLARE value INTEGER;
    SET value = 0;
    SELECT current_value INTO value
    FROM sequence
    WHERE name = seq_name;
    RETURN value;
END
$
DELIMITER ;

##3.创建–取下一个值的函数

DROP FUNCTION IF EXISTS nextval;
DELIMITER $
CREATE FUNCTION nextval (seq_name VARCHAR(50))
    RETURNS INTEGER
    LANGUAGE SQL
    DETERMINISTIC
    CONTAINS SQL
    SQL SECURITY DEFINER
    COMMENT ''
BEGIN
    UPDATE sequence
    SET current_value = current_value + increment
    WHERE name = seq_name;
    RETURN currval(seq_name);
END
$
DELIMITER ;

##4.创建–更新当前值的函数
DROP FUNCTION IF EXISTS setval;
DELIMITER $
CREATE FUNCTION setval (seq_name VARCHAR(50), value INTEGER)
    RETURNS INTEGER
    LANGUAGE SQL
    DETERMINISTIC
    CONTAINS SQL
    SQL SECURITY DEFINER
    COMMENT ''
BEGIN
    UPDATE sequence
    SET current_value = value
    WHERE name = seq_name;
    RETURN currval(seq_name);
END
$
DELIMITER ;


##5.使用及测试
INSERT INTO sequence VALUES ('testSeq', 0, 1);
##添加一个sequence名称和初始值，以及自增幅度

SELECT SETVAL('testSeq', 10);
##设置指定sequence的初始值

SELECT CURRVAL('testSeq');
##查询指定sequence的当前值

SELECT NEXTVAL('testSeq');
##查询指定sequence的下一个值
