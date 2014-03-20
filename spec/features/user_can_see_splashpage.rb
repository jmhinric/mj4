require 'spec_helper'

describe "user can see splashpage" do

  it "allows user to view splashpage at the root" do
    visit '/'
    expect(page).to have_content "New Game"
  end
end