class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.references :game
    end
  end
end
