export const IsItemAvailable = (timeStr) => {
    let startTime = new Date();
    let endTime = new Date();

    let times = timeStr.split('-');

    startTime.setHours(times[0].split(':')[0]);
    let m1 = 0;
    if (parseInt(times[0].split(':')[1]) > 0) {
        m1 = parseInt(times[0].split(':')[1])
    }
    startTime.setMinutes(m1);
    startTime.setSeconds(0);

    startTime = startTime.getTime();

    endTime.setHours(times[1].split(':')[0]);
    let m2 = 0;
    if (parseInt(times[1].split(':')[1]) < 59) {
        m2 = parseInt(times[1].split(':')[1])
    }
    endTime.setMinutes(m2);
    endTime.setSeconds(59);

    endTime = endTime.getTime();

    console.log('--------------------');
    console.log('start----->', new Date(startTime));
    console.log(new Date())
    console.log('start----->', new Date(endTime));
    console.log('--------------------');

    return startTime <= new Date().getTime() && new Date().getTime() <= endTime ? true : false;

}

