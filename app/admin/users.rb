ActiveAdmin.register User do
    permit_params :email, :password, :password_confirmation, :access_locked
  
    index do
      selectable_column
      id_column
      column :email
      column :access_locked
      actions
    end
  
    form do |f|
      f.inputs do
        f.input :email
        f.input :access_locked
      end
      f.actions
    end
  
    member_action :ban, method: :put do
      resource.lock_access!
      redirect_to resource_path, notice: "User banned"
    end
  
    action_item :ban, only: :show do
      link_to 'Ban User', ban_admin_user_path(resource), method: :put unless resource.access_locked?
    end
  
    member_action :unban, method: :put do
      resource.unlock_access!
      redirect_to resource_path, notice: "User unbanned"
    end
  
    action_item :unban, only: :show do
      link_to 'Unban User', unban_admin_user_path(resource), method: :put if resource.access_locked?
    end
  end
  