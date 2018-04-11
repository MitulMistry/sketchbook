module ClassOrderable
  extend ActiveSupport::Concern

  def randomized(count)
    order(Arel.sql("RANDOM()")).first(count)
  end
end
