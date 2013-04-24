class GraphController < ApplicationController
  def show
    @data = [
             "@fields.event:login",
             "@fields.name:manoj"
            ].map do |q|
      entries = Tire.search('logstash'){
        query {
          #string "@fields.event:#{name}"
          string q
        }
        filter(:range, {
                 "@timestamp" => {
                   :from => 2.days.ago,
                   :to => Time.now
                 }})
        
        facet('count') {
          date "@timestamp", :interval => "10m"}
      }.results.facets["count"]["entries"]

      times = entries.map { |e| e["time"]}
      counts = entries.map { |e| e["count"]}
      times.zip(counts)
    end
  end
end
