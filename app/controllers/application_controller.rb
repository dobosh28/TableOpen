class ApplicationController < ActionController::API
    # include ActionController::RequestForgeryProtection
    # protect_from_forgery with: :exception

    # rescue_from StandardError, with: :unhandled_error
    # rescue_from ActionController::InvalidAuthenticityToken,
    #     with: :invalid_authenticity_token

    #before_action :snake_case_params, :attach_authenticity_token

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def require_logged_in
        unless current_user
            render json: { message: 'Unauthorized' }, status: :unauthorized 
        end
    end

    def logged_in?
        !!current_user
    end

    def test
        if params.has_key?(:login)
          login!(User.first)
        elsif params.has_key?(:logout)
          logout!
        end
      
        if current_user
          render json: { user: current_user.slice('id', 'email', 'session_token') }
        else
          render json: ['No current user']
        end
    end

    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    # def attach_authenticity_token
    #     headers['X-CSRF-Token'] = masked_authenticity_token(session)
    # end
end
