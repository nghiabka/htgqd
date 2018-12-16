-- added by MinhNd on 16/12/2018

CREATE TABLE `topsis_table` (
  `id` int(11) NOT NULL,
  `university_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `department_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `department_code` varchar(20) CHARACTER SET utf8 NOT NULL,
  `group_code` varchar(3) CHARACTER SET utf8 NOT NULL,
  `area` tinyint(1) NOT NULL,
  `university_avg_score` decimal(14,2) NOT NULL,
  `tuition` int(11) NOT NULL,
  `hobby_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `subject_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `department_avg_score` decimal(14,2) NOT NULL,
  `note` varchar(200) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `topsis_table`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `topsis_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

insert into `topsis_table` (university_name, department_name, department_code, group_code, area, university_avg_score, tuition, hobby_name, subject_name, department_avg_score, note)
select `university`.`name` as university_name, `department`.`name` as department_name, `department`.`code` as department_code, `group`.`code` as group_code, `university`.`area`, `university`.`score` as university_avg_score, `university`.`tuition`,  `hobbies`.`name` as hobby_name, `subject`.`name` as subject_name, `first_choice`.`score` as department_avg_score, `first_choice`.`note` from `university` 
	inner join `department` on `university`.`id` = `department`.`university_id` 
    inner join `hobbies` on `department`.`hobbies_id` = `hobbies`.`id`
	inner join `department_has_group` on `department`.`id` = `department_has_group`.`department_id`
    inner join `group` on `department_has_group`.`group_code` = `group`.`code`
    inner join `group_has_subject` on `group_has_subject`.`group_code` = `group`.`code`
    inner join `subject` on `subject`.`id` = `group_has_subject`.`subject_id`
    inner join `first_choice` on `first_choice`.`department_id` = `department`.`id`