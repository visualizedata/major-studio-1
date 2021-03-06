d3.csv('data2.csv', function(error, data) {
    if (error) throw error;
    
    d3.select("#coeff")
		.on("click", function() {
		    d3.selectAll('div.circle').remove();
		    coeff(data)});
        
    d3.select("#indexes")
		.on("click", function() {
		    d3.selectAll('div.circle').remove();
		    indexes(data)});

});

function coeff(data) {
    
// ------------ SETUP ------------
    
    var groups = d3.select('div.content')
        .selectAll('div')
        .data(data.filter(function(d){return d.region == 'Africa'}))
        .enter()
        .append('div')
            .attr('class', function(d) { return 'col-md-2 col-sm-3 circle ' + d.country })
            .attr('width','150')
            .attr('height','150')
                
    var backRadius = (100 / 3.14) ^ (1 / 2);
    function giiRadius(d) { return ((d.gii_rep  ) / 3.14) ^ (1 / 2) };
    function giniRadius(d) { return ((d.gini) / 3.14) ^ (1 / 2) };
            
    var div = d3.selectAll("div.circle"),
        divWidth = div.attr('width'),
        divHeight = div.attr('height');
        
    div.append('svg')
        .attr('width','150')
        .attr('height','150')
        .attr('class','svg')
        .on('mouseover', function() {
            d3.select(this).select('.gini')
                .transition().duration(300)
                .attr('cx', function(d) { return [svgWidth / 2 + (backRadius) - (giniRadius(d))]})
                .attr('cy', svgHeight / 2)
            d3.select(this).select('.gii')
                .transition().duration(300)
                .attr('cx', function(d) { return [svgWidth / 2 - (backRadius) + (giiRadius(d))]})
                .attr('cy', [svgHeight / 2])
            })
        .on('mouseout', function() {
            d3.select(this).select('.gini')
                .transition().duration(300)
                .attr('cx',svgWidth/2)
                .attr('cy',function(d) { return [(svgHeight/2) + (backRadius) - (giniRadius(d))]})
            d3.select(this).select('.gii')
                .transition().duration(300)
                .attr('cx',svgWidth/2)
                .attr('cy',function(d) { return [(svgHeight/2) + (backRadius) - (giiRadius(d))]})
            // d3.select(this).selectAll('circle.info')
            //     .transition().duration(5000)
            //     .style('opacity',0)
            //     .attr('cy', window.innerHeight)
            // d3.select(this).selectAll('text.info')
            //     .transition().duration(5000)
            //     .style('opacity',0)
            //     .attr('transform', 'translate (0,' + [window.innerHeight + (svgWidth/2)] + ')')
            })
        
    var svg = d3.selectAll("svg")
        svgWidth = svg.attr('width'),
        svgHeight = svg.attr('height')
        
// ------------ CIRCLES ------------ 
    
    var background = svg.append('circle')
        .style('fill','#cccccc').style('opacity',0.3)
        .attr('class', 'result')
        .attr("r", backRadius)
        .attr('cx', svgWidth/2 )
        .attr('cy', svgHeight/2 )
    
    var gii = svg.append('circle')
        .style("fill", "black")
        .attr('class', 'gii')
        .attr('r',giiRadius)
        .attr('cx',svgWidth/2)
        .attr('cy',function(d) { return [(svgHeight/2) + (backRadius) - (giiRadius(d))]})
        .on('mouseover', function() {
            d3.select(this.parentNode).select('.giiTip')
                .style('display','inline')
        })
        .on('mouseout', function() {
            d3.select(this.parentNode).select('.giiTip')
                .style('display','none')
        })
    
    var gini = svg.append('circle')
        .style("fill", function(d) {
            if (d.hdi == 'very high') {return 'blue' }
            if (d.hdi == 'medium') {return 'orange' }
            if (d.hdi == 'low') {return 'red'}
        })
        .attr('class', 'gini')
        .attr('r',giniRadius)
        .attr('cx',svgWidth/2)
        .attr('cy',function(d) { return [(svgHeight/2) + (backRadius) - (giniRadius(d))]})
        .on('mouseover', function() {
            d3.select(this.parentNode).select('.giniTip')
                .style('display','inline')
        })
        .on('mouseout', function() {
            d3.select(this.parentNode).select('.giniTip')
                .style('display','none')
        })

// ------------ TEXT + TOOLTIPS  ------------ 

    var country = svg.append('text')
        .text(function(d) { return d.country} )
        .attr('transform', 'translate(' + svgWidth/2 +  ',20)')
        .style('text-anchor', 'middle')
        
    var giniTip = svg.append('text')
        .attr('class','giniTip')
        .text(function(d) { return 'gini: ' + d.gini } )
        .attr('transform', 'translate(' + svgWidth/2 +  ',140)')
        .style('fill','grey')
        .style('display','none')
        .style('text-anchor', 'middle')
        
    var giiTip = svg.append('text')
        .attr('class','giiTip')
        .text(function(d) { return 'gii: ' + (d.gii_rep ) } )
        .attr('transform', 'translate(' + svgWidth/2 +  ',140)')
        .style('fill','grey')
        .style('display','none')
        .style('text-anchor', 'middle')
        
// ------------ ON CLICK  ------------ 
    
//     d3.selectAll('.svg')
// 		.on('click', function() {
//             d3.select(this).append('circle')
//                 .attr('class','info')
//                 .attr('r', 100)
//                 .attr('cx',svgWidth/2)
//                 .attr('cy',svgHeight/2)
//                 .style('fill','black')
//             d3.select(this).append('text')
//                 .attr('class','info')
//                 .text(function(d) { return d.seced_f + '% females' })
//                 .style('fill','red')
//                 .style('text-anchor','middle')
//                 .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2-50] + ')')
//             d3.select(this).append('text')
//                 .attr('class','info')
//                 .text('with at least some')
//                 .style('fill','white')
//                 .style('text-anchor','middle')
//                 .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2-30] + ')')
//             d3.select(this).append('text')
//                 .attr('class','info')
//                 .text('secondary education')
//                 .style('fill','white')
//                 .style('text-anchor','middle')
//                 .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2-10] + ')')
//             d3.select(this).append('text')
//                 .attr('class','info')
//                 .text(function(d) { return d.labour_f + '% females'  })
//                 .style('fill','red')
//                 .style('text-anchor','middle')
//                 .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2+10] + ')')
//             d3.select(this).append('text')
//                 .attr('class','info')
//                 .text('participating in')
//                 .style('fill','white')
//                 .style('text-anchor','middle')
//                 .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2+30] + ')')
//             d3.select(this).append('text')
//                 .attr('class','info')
//                 .text('labor force')
//                 .style('fill','white')
//                 .style('text-anchor','middle')
//                 .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2+50] + ')')
//             })
            
    // d3.select('.svg')
    //     .on('click', function() {
    //         d3.select(this.childNode).selectAll('.info')
    //             .transition().duration(5000)
    //             .style('opacity',0)
    //             // .attr('cy', window.innerHeight)
    //     })
        
// ------------ SORTING DATA  ------------ 
        
    d3.select("#sortMale")
		.on("click", function() {
			groups.sort(function(b, a){
                return a["male_index"]-b["male_index"];})
		})
        
    d3.select("#sortFemale")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["female_index"]-b["female_index"];
        })})
        
    d3.select("#sortGii")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["gii_rep"]-b["gii_rep"];
        })})

    d3.select("#sortGini")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["gini"]-b["gini"];
        })})
		
}

function indexes(data) {
    
// ------------ SETUP ------------ 

    var groups = d3.select('div.content')
            .selectAll('div')
            .data(data.filter(function(d){return d.region == 'Africa'}))
            .enter()
            .append('div')
                .attr('class', function(d) { return 'col-md-2 col-sm-3 circle ' + d.country })
                .attr('width','150')
                .attr('height','150')
                
    var backRadius = (100 / 3.14) ^ (1 / 2);
    function maleRadius(d) { return ((d.male_index  ) / 3.14) ^ (1 / 2) };
    function femaleRadius(d) { return ((d.female_index  ) / 3.14) ^ (1 / 2) };
            
    var div = d3.selectAll("div.circle");
    var divWidth = div.attr('width');
    var divHeight = div.attr('height');
        
    div.append('svg')
        .attr('width','150')
        .attr('height','150')
        .attr('class','svg')
        .on('mouseover', function() {
            d3.select(this).select('.female')
                .transition().duration(300)
                .attr('cx', function(d) { return (svgWidth/2 + (backRadius) - (femaleRadius(d)))})
                .attr('cy', (svgHeight/2))
            d3.select(this).select('.male')
                .transition().duration(300)
                .attr('cx', function(d) { return (svgWidth/2 - (backRadius) + (maleRadius(d)))})
                .attr('cy', (svgHeight/2))
        })
        .on('mouseout', function() {
            d3.select(this).select('.female')
                .transition().duration(300)
                .attr('cx', svgWidth/2)
                .attr('cy', function(d) { return [(svgHeight/2) + (backRadius) - (femaleRadius(d))]})
            d3.select(this).select('.male')
                .transition().duration(300)
                .attr('cx', svgWidth/2)
                .attr('cy', function(d) { return [(svgHeight/2) + (backRadius) - (maleRadius(d))]})
            d3.select(this).selectAll('circle.info')
                .transition().duration(5000)
                .style('opacity',0)
                .attr('cy', window.innerHeight)
            d3.select(this).selectAll('text.info')
                .transition().duration(5000)
                .style('opacity',0)
                .attr('transform', 'translate (0,' + [window.innerHeight + (svgWidth/2)] + ')') 
        })
        
    var svg = d3.selectAll("svg")
        svgWidth = svg.attr('width'),
        svgHeight = svg.attr('height')
        
// ------------ CIRCLES ------------ 
        
    var background = svg.append('circle')
        .style('fill','#cccccc').style('opacity',0.3)
        .attr('class', 'result')
        .attr('r',backRadius)
        .attr('transform', 'translate(' + svgWidth/2 +  ',' + svgHeight/2 + ')')
    
    var male = svg.append('circle')
        .style("fill", "black")
        .attr('class', 'male')
        .attr('r', maleRadius)
        .attr('cx', svgWidth/2)
        .attr('cy', function(d) { return [(svgHeight/2) + (backRadius) - (maleRadius(d))]})
        .on('mouseover', function() {
            d3.select(this.parentNode).select('.maleTip')
                .style('display','inline')
        })
        .on('mouseout', function() {
            d3.select(this.parentNode).select('.maleTip')
                .style('display','none')
        })
    
    var female = svg.append('circle')
        .style("fill", function(d) {
            if (d.hdi == 'very high') {return 'blue' }
            if (d.hdi == 'medium') {return 'orange' }
            if (d.hdi == 'low') {return 'red'}
        })
        .attr('class', 'female')
        .attr('r',femaleRadius)
        .attr('cx', svgWidth/2)
        .attr('cy', function(d) { return [(svgHeight/2) + (backRadius) - (femaleRadius(d))] } )
        .on('mouseover', function() {
            d3.select(this.parentNode).select('.femaleTip')
                .style('display','inline')
        })
        .on('mouseout', function() {
            d3.select(this.parentNode).select('.femaleTip')
                .style('display','none')
        })
        
// ------------ TEXT + TOOLTIPS ------------ 
        
    var country = svg.append('text')
        .text(function(d) { return d.country} )
        .attr('transform', 'translate(' + svgWidth/2 +  ',20)')
        .style('text-anchor', 'middle')
        
    var maleTip = svg.append('text')
        .attr('class','maleTip')
        .text(function(d) { return 'male index: ' + [d.male_index ]} )
        .attr('transform', 'translate(' + svgWidth/2 +  ',140)')
        .style('fill','grey')
        .style('text-anchor', 'middle')
        .style('display','none')
        
    var femaleTip = svg.append('text')
        .attr('class','femaleTip')
        .text(function(d) { return 'female index: ' + [d.female_index ]} )
        .attr('transform', 'translate(' + svgWidth/2 +  ',140)')
        .style('fill','grey')
        .style('display','none')
        .style('text-anchor', 'middle')
        
// ------------ ON CLICK  ------------ 
    
    d3.selectAll('.svg')
		.on('click', function() {
            d3.select(this).append('circle')
                .attr('class','info')
                .attr('r', 100)
                .attr('cx',svgWidth/2)
                .attr('cy',svgHeight/2)
                .style('fill','black')
            d3.select(this).append('text')
                .attr('class','info')
                .text(function(d) { return d.mat_mort_ratio })
                .style('fill','red')
                .style('text-anchor','middle')
                .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2-50] + ')')
            d3.select(this).append('text')
                .attr('class','info')
                .text('maternal deaths')
                .style('fill','white')
                .style('text-anchor','middle')
                .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2-30] + ')')
            d3.select(this).append('text')
                .attr('class','info')
                .text('per 100,000 live births')
                .style('fill','white')
                .style('text-anchor','middle')
                .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2-10] + ')')
            d3.select(this).append('text')
                .attr('class','info')
                .text(function(d) { return d.adol_birth_rate })
                .style('fill','red')
                .style('text-anchor','middle')
                .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2+10] + ')')
            d3.select(this).append('text')
                .attr('class','info')
                .text('births per 1,000 women')
                .style('fill','white')
                .style('text-anchor','middle')
                .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2+30] + ')')
            d3.select(this).append('text')
                .attr('class','info')
                .text('aged 15-18')
                .style('fill','white')
                .style('text-anchor','middle')
                .attr('transform', 'translate(' + svgWidth/2 +  ',' + [svgHeight/2+50] + ')')
            })
        
// ------------ SORTING DATA ------------ 
        
    d3.select("#sortMale")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["male_index"]-b["male_index"];
        })})
        
        
    d3.select("#sortFemale")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["female_index"]-b["female_index"];
        })})
        
    d3.select("#sortGii")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["gii_rep"]-b["gii_rep"];
        })})

    d3.select("#sortGini")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["gini"]-b["gini"];
        })})
		
}
