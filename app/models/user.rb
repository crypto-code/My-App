class User < ApplicationRecord
  has_many :tasks
  validates :username, presence: true,
            length: { minimum: 5 }, uniqueness: true
  validates :password, presence: true,
            length: {minimum: 8}
end
