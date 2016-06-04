Gems:

-Devise
-Paperclip - for image uploading
-Bootstrap?

Models:

-devise User/Artist
	-username
	-first name
	-last name
	-has_many Sketches
	-has_many Comments

-Sketches
	-title
	-description
	-belongs_to User
	-has_many SketchTags
	-has_many Tags, through SketchTags

-Tags
	-title
	-has_many SketchTags
	-has_many Sketches, through SketchTags

-SketchTags
	-belongs_to Sketch
	-belongs_to Tag
  
-Comments
	-belongs_to Sketch
	-belongs_to User

Pages:
-splash page
-login
-register
-home - view all
-your sketches
-user/artist show page
-upload/create sketch
-Sketch show page
