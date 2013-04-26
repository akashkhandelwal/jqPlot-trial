class GraphController < ApplicationController
  def show
    @data = []
  end
    
  def data
    data = [
             "@fields.event:test_taken", "@fields.event:signup", "@fields.event:login"
            ].map do |q|
      entries = Tire.search('logstash'){
        query {
          #string "@fields.event:#{name}"
          string q
        }
        filter(:range, {
                 "@timestamp" => {
                   :from => 1.day.ago,
                   :to => Time.now
                 }})
        
        facet('count') {
          date "@timestamp", :interval => "5m"}
      }.results.facets["count"]["entries"]

      times = entries.map { |e| e["time"]}
      counts = entries.map { |e| e["count"]}
      times.zip(counts)
    end
    render :json => data
  end
end
