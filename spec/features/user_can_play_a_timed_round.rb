require 'spec_helper'

describe "user can play a timed round", :js => true do

	before :each do
    visit '/'
		click_button("New Game")
  end

	it "starts a new game" do
		expect(page).to have_content "Welcome to Scattergories"
	end

	it "plays a timed round" do
		click_button("Start Timer!")
		#my, oh my there are a lot of italian "p" words!
		fill_in "answer-1", :with => "pizza"
		fill_in "answer-2", :with => "pasta"
		fill_in "answer-3", :with => "pepperoni"
		fill_in "answer-4", :with => "parmesean"
		fill_in "answer-5", :with => "pecorino"
		fill_in "answer-6", :with => "pesto"
		fill_in "answer-7", :with => "prosciutto"
		fill_in "answer-8", :with => "pappardelle"
		fill_in "answer-9", :with => "pomodoro"
		fill_in "answer-10", :with => "penne"
		fill_in "answer-11", :with => "panna cotta"
		fill_in "answer-12", :with => "puntine"
		Capybara.default_wait_time = 6
		expect(page).to have_content "Time's Up!!!"
		find('input#answer-2')[:disabled].should eq "true"
	end

	# it "lets user reject answers" do

	# end

end
