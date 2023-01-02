# frozen_string_literal: true
    class Users::SessionsController < Devise::SessionsController
      skip_before_action :verify_authenticity_token
      before_action :configure_sign_in_params, only: [:create]
      before_action :destroy_user, only: [:destroy]

      # GET /resource/sign_in
      def new
        @user = User.all
        render :json => @user
      end

      # POST /resource/sign_in
      def create
        @user = User.new(configure_sign_in_params)

        if @user.save
          render :json => @user, status: :created
        else
          render :json => @user.errors, status: :unprocessable_entity 
        end
      end

      # DELETE /resource/sign_out
      def destroy
        @user.destroy
      end

      private

      def destroy_user
        @user = User.find_by_id(params[:id])
      end

      # If you have extra params to permit, append them to the sanitizer.
      def configure_sign_in_params
        devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
      end
    end
