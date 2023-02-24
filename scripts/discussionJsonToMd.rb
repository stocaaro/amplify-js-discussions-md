require 'JSON';

json = JSON.parse(STDIN.readlines.join());

def closeCode(mdBlob)
    count = mdBlob.scan(/\`\`\`/m).count
    if (count % 2 == 1)
        return mdBlob + "\n```"
    else
        return mdBlob
    end
end

json['data'].each do |disc|
    node = disc['node']
    puts '# ' + node['title']
    puts
    puts '---------------'
    puts
    puts 'Author: @' + node.dig('author', 'login').to_s
    puts 'Upvotes: ' + node['upvoteCount'].to_s
    comments = node.dig('comments', 'edges')
    puts 'Comments: ' + comments&.count&.to_s
    puts
    puts closeCode(node['body'])

    if (comments)
        comments.each do |comment|
            cnode = comment['node']
            puts '## Comment'
            puts
            puts '---------------'
            puts
            puts 'Author: @' + cnode.dig('author', 'login').to_s
            puts
            puts closeCode(cnode['body'])
        end
    end

    puts
    puts '---------------'
    puts
    puts '---------------'
    puts
end
