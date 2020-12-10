class Task < ApplicationRecord
  validates :user_id, presence: true
  validates :title, presence: true,
           length: {minimum: 5, maximum: 60}
  validates :flag, presence: true,
           length: {minimum: 2}
  validates :description, length: {minimum: 10}
end
