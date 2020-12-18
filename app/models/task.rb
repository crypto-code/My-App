class Task < ApplicationRecord
  validates :user_id, presence: true, numericality: { only_integer: true }
  validates :title, presence: true, uniqueness: true,
           length: {minimum: 5, maximum: 60}
  validates :flag, presence: true,
           length: {minimum: 2}
  validates :description, length: {minimum: 10}, allow_blank: true, allow_nil: true
  validates :deadline, presence: true

  validate :time_is_valid_time

  validate :deadline_is_valid_date

  def time_is_valid_time
    unless time == nil or time.is_a?(Time)
      errors.add(:time, 'must be a valid time')
    end
  end

  def deadline_is_valid_date
    unless deadline.is_a?(Date)
      errors.add(:deadline, 'must be a valid date')
    end
  end
end
