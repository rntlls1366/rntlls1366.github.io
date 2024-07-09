$(document).ready(function() {
    const dataFile = 'data.json';
    
    let data = [];
    let timeSlots = [];

    $.getJSON(dataFile, function(jsonData) {
        data = jsonData;

        // 시간대 추출
        if (data.length > 0) {
            timeSlots = Object.keys(data[0]).filter(key => key.match(/^\d{1,2}시\d{2}분$/));
        }

        // 호선 옵션 설정
        const lines = [...new Set(data.map(item => item['호선']))];
        lines.forEach(line => {
            $('#line').append(`<option value="${line}">${line}</option>`);
        });

        // 출발역 옵션 설정
        const stations = [...new Set(data.map(item => item['출발역']))];
        stations.forEach(station => {
            $('#station').append(`<option value="${station}">${station}</option>`);
        });

        // 시간대 옵션 설정
        timeSlots.forEach(time => {
            $('#time').append(`<option value="${time}">${time}</option>`);
        });
    });

    $('#filterForm').submit(function(event) {
        event.preventDefault();
        
        const day = $('#day').val();
        const line = $('#line').val();
        const station = $('#station').val();
        const time = $('#time').val();

        const filteredData = data.filter(item => 
            item['요일구분'] == day &&
            item['호선'] == line &&
            item['출발역'] == station
        );

        var result = "";

        for(let temp of filteredData) {
            console.log(temp);
            result += `<p>노선종류 : ${temp['상하구분']} / 혼잡도 (${time}): ${temp[time]}</p>`;
            //result += `<br/>`;
            
        }
        $('#result').html(result);
    });

    $('line').change(function() {
        $('#station option').remove();

        const filteredData = data.filter(item => 
            item['호선'] == this.val()
        );

        const stations = [...new Set(filteredData.map(item => item['출발역']))];
        stations.forEach(station => {
            $('#station').append(`<option value="${station}">${station}</option>`);
        });
    })
});
