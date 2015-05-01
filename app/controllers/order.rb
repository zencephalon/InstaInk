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

  
  
  erb :'order/paid'
end

get '/order/:id' do |id|
  @order = Order.find(id)
  erb :'order/show'
end