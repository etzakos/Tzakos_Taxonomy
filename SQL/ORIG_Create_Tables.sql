CREATE DATABASE IF NOT EXISTS Taxonomy_25Jan2022;

use Taxonomy_25Jan2022;

SET GLOBAL local_infile=1;

DROP TABLE IF EXISTS `Nodes`;
DROP TABLE IF EXISTS `Gencode`;
DROP TABLE IF EXISTS `Tax_Names`;
DROP TABLE IF EXISTS `Division`;
DROP TABLE IF EXISTS `Deleted_Nodes`;
DROP TABLE IF EXISTS `Merged_Nodes`;
DROP TABLE IF EXISTS `Citations`;
DROP TABLE IF EXISTS `Deleted`;
DROP TABLE IF EXISTS `Fullnamelineage`;

CREATE TABLE `Gencode`
(
    `genetic_code_id` INT(10) unsigned NOT NULL,
    `abbreviation` VARCHAR(200) NULL,
    `name` VARCHAR(100) NULL,
    `cde` VARCHAR(100) NULL,
    `starts` VARCHAR(200) NULL,
    PRIMARY KEY (`genetic_code_id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Gencode';

-- Load data unde Gencode tables 
LOAD DATA LOCAL INFILE '../taxdmp/gencode.dmp'
INTO TABLE `gencode`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`genetic_code_id`, `abbreviation`, `name`,`cde`,`starts`);

CREATE TABLE `Nodes`
(
    `tax_id` int(10) unsigned NOT NULL,
    `parent_tax_id`  int(10) unsigned DEFAULT NULL,
    `rank_id` VARCHAR(200) NULL,
    `embl_code` VARCHAR(20) NULL,
    `division_id` VARCHAR(200) NULL,
    `inherited_div_flag` INT NULL,
    `genetic_code_id` INT(10) unsigned NOT NULL,
    `inherited_GC_flag` INT NULL,
    `mitochondrial_genetic_code_id` INT NULL ,
    `inherited_MGC_flag` INT NULL,
    `GenBank_hidden_flag` INT NULL,
    `hidden_subtree_root_flag` INT NULL,
    `comments` VARCHAR(200),
    PRIMARY KEY (`tax_id` )
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Nodes';

-- Load data unde Node tables 
LOAD DATA LOCAL INFILE '../taxdmp/nodes.dmp'
INTO TABLE `Nodes`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`tax_id`, `parent_tax_id`, `rank_id`, `embl_code`, `division_id`, `inherited_div_flag`,
`genetic_code_id`, `inherited_GC_flag`, `mitochondrial_genetic_code_id`, `inherited_MGC_flag`,
`GenBank_hidden_flag`, `hidden_subtree_root_flag`, `comments`);



CREATE TABLE `Tax_Names`
 (
 `id` BIGINT NOT NULL AUTO_INCREMENT,
 `tax_id` int(10) unsigned NOT NULL,
 `name_txt` varchar(150) DEFAULT NULL,
 `unique_name` varchar(200) DEFAULT NULL,
 `name_class` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Tax_Names';

LOAD DATA LOCAL INFILE '../taxdmp/names.dmp'
INTO TABLE `Tax_Names`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
LINES TERMINATED BY '\t|\n'
( `tax_id`, `name_txt`,`unique_name`,`name_class`);


CREATE TABLE `Division`
(
  `div_id` int(10) NOT NULL,
  `div_code` varchar(3) NOT NULL,
  `div_name` varchar(45) DEFAULT NULL,
  `div_description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`div_id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Division';

LOAD DATA LOCAL INFILE '../taxdmp/division.dmp'
INTO TABLE `Division`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`div_id`, `div_code`, `div_name`, `div_description`);


CREATE TABLE `Deleted_Nodes`
(
  `tax_id` int(10) NOT NULL,
  PRIMARY KEY (`tax_id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Deleted_Nodes';

LOAD DATA LOCAL INFILE '../taxdmp/delnodes.dmp'
INTO TABLE `Deleted_Nodes`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`tax_id`);

CREATE TABLE `Merged_Nodes`
(
  `old_tax_id` int(10) NOT NULL,
  `new_tax_id` int(10) NOT NULL
  -- PRIMARY KEY (`tax_id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Merged_Nodes';

LOAD DATA LOCAL INFILE '../taxdmp/merged.dmp'
INTO TABLE `Merged_Nodes`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`old_tax_id`, `new_tax_id`);


CREATE TABLE `Citations`
(
  `cit_id` int(10) NOT NULL,
  `cit_key` varchar(250) NOT NULL,
  `pubmed_id` int(10) NOT NULL,
  `medline_id` int(10) NOT NULL,
  `url` varchar(250) NOT NULL,
  `text` TEXT NOT NULL,
  `taxid_list` varchar(350) NOT NULL
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Citations';

LOAD DATA LOCAL INFILE '../taxdmp/citations.dmp'
INTO TABLE `Citations`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`cit_id`, `cit_key`, `pubmed_id`, 
`medline_id`, `url`, `text`, `taxid_list`);



CREATE TABLE `deleted`
(
`id` BIGINT NOT NULL AUTO_INCREMENT,
  `deleted_tax_id` int(10) NOT NULL,
   PRIMARY KEY (`id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'deleted_tax_id';


LOAD DATA LOCAL INFILE '../taxdmp/deleted.dmp'
INTO TABLE `deleted`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`deleted_tax_id`);


CREATE TABLE `Fullnamelineage`
(
`tax_id` int(10) unsigned NOT NULL,
`name_txt` varchar(150) DEFAULT NULL,
`lineage` VARCHAR(200),
PRIMARY KEY (`tax_id` )
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Fullnamelineage';


LOAD DATA LOCAL INFILE '../taxdmp/fullnamelineage.dmp'
INTO TABLE `Fullnamelineage`
CHARACTER SET UTF8 FIELDS TERMINATED BY '\t|\t'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\t|\n'
(`tax_id`, `name_txt`, `lineage`);


ALTER TABLE `tax_names`  ADD CONSTRAINT `FK_tax_names_tax_id` FOREIGN KEY (`tax_id`) REFERENCES `nodes` (`tax_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `nodes`  ADD CONSTRAINT `FK_nodes_genetic_code_id` FOREIGN KEY (`genetic_code_id`) REFERENCES `gencode` (`genetic_code_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Merged_Nodes` ADD UNIQUE INDEX `idx_Merged_Nodes_old_tax_id` (`old_tax_id`);
ALTER TABLE `deleted`  ADD CONSTRAINT `FK_deleted_deleted_tax_id` FOREIGN KEY (`deleted_tax_id`) REFERENCES `merged_nodes` (`old_tax_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tax_names` ADD INDEX `idx_tax_names_name_txt` (`name_txt`);
ALTER TABLE `Nodes` ADD INDEX `idx_nodes_parent_tax_id` (`parent_tax_id`);
ALTER TABLE `Nodes` ADD INDEX `idx_nodes_rank_id` (`rank_id`);

ALTER TABLE `tax_names` ADD `lower_name_txt` varchar(150);
SET SQL_SAFE_UPDATES = 0;
UPDATE  `tax_names` SET `lower_name_txt` = lower(`name_txt`);
ALTER TABLE `tax_names` ADD INDEX `idx_tax_names_lower_name_txt` (`lower_name_txt`);


-- ALTER TABLE `Nodes` ADD INDEX `idx_NCBI_NODE_DIV` (`division_id`);
-- ALTER TABLE `Nodes` ADD INDEX `idx_NCBI_NODE_CATEGORIES` (`tax_id`);