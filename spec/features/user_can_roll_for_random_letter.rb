require 'spec_helper'

describe "user can roll for random letter", :js => true do
  it "starts a new game" do
    visit '/'
    click_button("New Game")
    expect(page).to have_content "Welcome to Scattergories"
  end

  it "shows a random letter" do
    visit '/'
    click_button("Roll The Die")
    within("#roll_result") do
      "m"
    end
    
    expect(page).to have_content "m"
    save_and_open_page
  end

end
