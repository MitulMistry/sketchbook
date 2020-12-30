# Regenerates the file names and places them in the proper file structure/hierarchy
# Copies files - old assets must be deleted manually

namespace :sketch do
    task migrate_sketches_to_active_storage: :environment do
      Sketch.where.not(image_file_name: nil).find_each do |sketch|
        # This step helps us catch any attachments we might have uploaded that
        # don't have an explicit file extension in the filename
        image = sketch.image_file_name
        ext = File.extname(image)
        image_original = CGI.unescape(image.gsub(ext, "_original#{ext}"))

        # this url pattern can be changed to reflect whatever service you use - #{image_original} - sprintf converts '1' to '001'
        image_url = "https://#{ENV['S3_BUCKET_NAME']}.s3.#{ENV['AWS_REGION']}.amazonaws.com/sketches/images/000/000/#{sprintf '%03d', sketch.id}/original/#{image}"
        sketch.image.attach(io: open(image_url),
                                    filename: sketch.image_file_name,
                                    content_type: sketch.image_content_type)
      end
    end
  end