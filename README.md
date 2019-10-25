# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :message
- has_many :groups_users
- has_many  :group,  through: groups_users  :

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :gruoup_name
- has_many :groups_users
- has_many  :users,  through: groups_users  :

## gruoups_namesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
### Association
- has_many :groups
- has_many  :groups,  

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|gruoup_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messageテーブル
|Column|Type|Options|
|image|integer|null: false|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups_names
- belongs_to :users
-