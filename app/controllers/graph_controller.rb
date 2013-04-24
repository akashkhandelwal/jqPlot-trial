class GraphController < ApplicationController
  def show
    @data = []
  end
    
  def data
    data = [
             "@fields.event:test_taken"
            ].map do |q|
      entries = Tire.search('logstash'){
        query {
          #string "@fields.event:#{name}"
          string q
        }
        filter(:range, {
                 "@timestamp" => {
                   :from => 1.minute.ago,
                   :to => Time.now
                 }})
        
        facet('count') {
          date "@timestamp", :interval => "30s"}
      }.results.facets["count"]["entries"]

      times = entries.map { |e| e["time"]}
      counts = entries.map { |e| e["count"]}
      times.zip(counts)
    end
    render :json => data
  end
end
