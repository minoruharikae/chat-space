class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.referencee :group, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
