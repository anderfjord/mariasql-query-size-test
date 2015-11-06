CREATE TABLE `screenshots` (

  `screenshot_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `screenshot` longtext,
  `screenshot_length` int(10) unsigned NULL DEFAULT NULL,

  PRIMARY KEY (`screenshot_id`)
  
) ENGINE=MyISAM DEFAULT CHARSET=latin1
