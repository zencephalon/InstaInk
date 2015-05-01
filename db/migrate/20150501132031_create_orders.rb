class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :stripeToken
      t.string :stripeEmail
      t.string :stripeShippingName
      t.string :stripeShippingAddressLine1
      t.string :stripeShippingAddressApt
      t.string :stripeShippingAddressZip
      t.string :stripeShippingAddressCity
      t.string :stripeShippingAddressState
      t.string :stripeShippingAddressCountry
      t.string :stripeShippingAddressCountryCode

      t.boolean :paid, default: false

      t.timestamps
    end
  end
end
