class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def spotify
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    # binding.pry
    if(request.env["omniauth.auth"] && request.env["omniauth.auth"]["credentials"])
      session[:spotify_api_key] = request.env["omniauth.auth"]["credentials"]["token"]
      session[:spotify_auth] = request.env["omniauth.auth"]
      flash[:notice] = "Signed in with Spotify Successfully"
      redirect_to root_path
    end
  end

  def failure
    redirect_to root_path
  end
end
