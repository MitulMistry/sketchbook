#custom matcher - included in rails_helper.rb: Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
RSpec::Matchers.define :require_login do |expected|
  match do |actual|
    expect(actual).to redirect_to Rails.application.routes.url_helpers.new_user_session_path
  end

  failure_message do |actual|
    "expected to require login to access the method"
  end

  failure_message_when_negated do |actual|
    "expected not to require login to access the method"
  end

  description do
    "redirect to the login form"
  end
end