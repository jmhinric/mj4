require 'spec_helper'

describe "user can play a timed round", :js => true do
	it "starts a new game" do
		visit '/'
		click_button("New Game")
		expect(page).to have_content "Welcome to Scattergories"
	end

	it "plays a timed round" do
		visit '/'
		click_button("New Game")
		click_button("Start Timer!")
		#my, oh my there are a lot of italian "p" words!
		fill_in "slot_1", :with => "pizza"
		fill_in "slot_2", :with => "pasta"
		fill_in "slot_3", :with => "pepperoni"
		fill_in "slot_4", :with => "parmesean"
		fill_in "slot_5", :with => "pecorino"
		fill_in "slot_6", :with => "pesto"
		fill_in "slot_7", :with => "prosciutto"
		fill_in "slot_8", :with => "pappardelle"
		fill_in "slot_9", :with => "pomodoro"
		fill_in "slot_10", :with => "penne"
		fill_in "slot_11", :with => "panna cotta"
		fill_in "slot_12", :with => "puntine"
		Capybara.default_wait_time = 6
		expect(page).to have_content "Time's Up!!!"
		find('input#slot_2')[:disabled].should eq "true"
		save_and_open_page
	end

end
