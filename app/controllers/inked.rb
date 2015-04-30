get '/gallery' do
  client = instaclient
  @user = client.user

  erb :gallery
end

get '/user/photos' do
  client = instaclient

  params[:next_max_id] = nil if params[:next_max_id] == "false"

  media = client.user_recent_media({max_id: params[:next_max_id]})
  return {photos: media, next_max_id: media.pagination.next_max_id}.to_json
end