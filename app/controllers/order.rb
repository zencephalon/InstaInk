post '/order' do
  order = Order.create

  params[:photos].each do |index, photo_data|
    order.photos << Photo.create(photo_data)
  end

  "/order/#{order.id}"
end

get '/order/:id' do |id|
  @order = Order.find(id)
  erb :'order/show'
end