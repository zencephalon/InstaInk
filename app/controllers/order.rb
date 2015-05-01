post '/order' do
  order = Order.create

  params[:photos].each do |index, photo_data|
    order.photos << Photo.create(photo_data)
  end

  "/order/#{order.id}"
end

post '/order/:id/paid' do |id|
  order = Order.find(id)
  useful_params = {}
  %w(stripeToken stripeEmail stripeShippingName stripeShippingAddressLine1 stripeShippingAddressApt stripeShippingAddressZip stripeShippingAddressCity stripeShippingAddressState stripeShippingAddressCountry stripeShippingAddressCountryCode).each do |attr|
    useful_params[attr] = params[attr]
  end
  order.update_attributes(useful_params)

  token = params[:stripeToken]

  begin
    charge = Stripe::Charge.create(
      :amount => 2000, # amount in cents, again
      :currency => "usd",
      :source => token,
      :description => "Instant Tattoos"
    )
  rescue Stripe::CardError => e
    # The card has been declined
    redirect "/order/#{order.id}?error=card%20declined"
  end 

  order.paid = true
  order.save

  erb :'order/paid'
end

get '/order/:id' do |id|
  @order = Order.find(id)
  @error = params[:error]
  erb :'order/show'
end