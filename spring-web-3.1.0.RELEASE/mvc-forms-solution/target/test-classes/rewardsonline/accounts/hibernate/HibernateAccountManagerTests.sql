create table T_ACCOUNT (ID integer identity primary key, NUMBER varchar(9), NAME varchar(50) not null, CREDIT_CARD varchar(16), DATE_OF_BIRTH date not null, EMAIL varchar(80) not null, REWARDS_NEWSLETTER boolean not null, MONTHLY_EMAIL_UPDATE boolean not null, unique(NUMBER));
create table T_ACCOUNT_BENEFICIARY (ID integer identity primary key, ACCOUNT_ID integer, NAME varchar(50), ALLOCATION_PERCENTAGE decimal(5,2) not null, SAVINGS decimal(9,2) not null, unique(ACCOUNT_ID, NAME));
insert into T_ACCOUNT (NUMBER, NAME, CREDIT_CARD, DATE_OF_BIRTH, EMAIL, REWARDS_NEWSLETTER, MONTHLY_EMAIL_UPDATE) values ('123456789', 'Keith and Keri Donald', '1234123412341234', '1981-04-11', 'keithd@gmail.com', true, false);
insert into T_ACCOUNT_BENEFICIARY (ACCOUNT_ID, NAME, ALLOCATION_PERCENTAGE, SAVINGS) values (0, 'Annabelle', 0.50, 0.00);
insert into T_ACCOUNT_BENEFICIARY (ACCOUNT_ID, NAME, ALLOCATION_PERCENTAGE, SAVINGS) values (0, 'Corgan', 0.50, 0.00);
insert into T_ACCOUNT (NUMBER, NAME, CREDIT_CARD, DATE_OF_BIRTH, EMAIL, REWARDS_NEWSLETTER, MONTHLY_EMAIL_UPDATE) values ('123456001', 'Riley Hollyhand', '1234123412340001', '1973-04-14', 'riley@hotmail.com', false, true);
insert into T_ACCOUNT (NUMBER, NAME, CREDIT_CARD, DATE_OF_BIRTH, EMAIL, REWARDS_NEWSLETTER, MONTHLY_EMAIL_UPDATE) values ('123456002', 'Zach Braff', '1234123412340002', '1965-05-11', 'zach@yahoo.com', true, false);
