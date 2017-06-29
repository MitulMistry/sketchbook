module ClassOrderable
  extend ActiveSupport::Concern

  def randomized(count)
    order("RANDOM()").first(count)
  end
end
