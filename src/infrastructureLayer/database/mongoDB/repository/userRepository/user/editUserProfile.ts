import UserModel from "../../../models/userModel";

export const editUserProfile = async (
  personal_info: any,
  social_links: any,
  uploaded_image: string,
  userId: string
) => {
  try {
    let { username, email, bio } = personal_info;
    let profile_img = personal_info.profile_img; // Set default profile_img to existing value

    // Trim username and email
    username = username.trim();
    email = email.trim();

    // Check if username or email is empty
    if (!username || !email)
      throw new Error("Username and email cannot be empty");

    // Trim bio and limit to 200 characters
    if (bio.length > 200) bio = bio.substring(0, 200).trim();

    // Update profile_img if uploaded_image is defined
    if (uploaded_image !== undefined) profile_img = uploaded_image;

    // Update user data in the database
    const userData = await UserModel.findByIdAndUpdate(
      userId,
      {
        personal_info: {
          username,
          email,
          bio,
          profile_img, // Updated profile_img value
        },
        social_links,
      },
      { new: true }
    ); // Set { new: true } to return the updated document

    return userData;
  } catch (error) {
    throw error;
  }
};
