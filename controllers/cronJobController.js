const ScheduleModel = require("../models/ScheduleModel")
const { Server } = require('socket.io')
const cron = require('node-cron');
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

// let { io } = require('../index.js')

let io;
let task;
const startAt_M = 1;
const startAt_H = 1;


const cronJob = (props) => {
    // let io = new Server(server, {
    //     cors: {
    //         origin: 'http://localhost:3000',
    //         methods: ['GET', 'POST']
    //     }
    // });

    if (props?.io) {
        io = props?.io;
    }

    const timing = props?.timing;

    console.log("io", io);
    console.log('timing', timing)

    let scheduleExpression = `0 ${startAt_M} ${startAt_H} * * *`

    if (timing) {
        if (task) {
            const startM = timing.startM;
            const startH = timing.startH;

            scheduleExpression = `0 ${startM} ${startH} * * *`;
            task.stop();
        }
    }

    console.log('scheduleExpression', scheduleExpression)

    task = cron.schedule(scheduleExpression, () => {
        // io.on('connect')

        // io.on('connection', (socket) => {
        //     console.log(`User connnected ${socket.id}`)
        //     io.emit('receive_message', `sdssssssssssss  ${new Date()}`)
        // })
        io.emit('receive_message', 'event start')
        console.log('ok')
        // task.stop()
    }, {
        scheduled: true,
    });
    task.start()
}


// const cronJob = async (io) => {
//     let scheduleData = await ScheduleModel.findOne({ active: true })
//     let startAt_H = parseInt(scheduleData.startAt_H)
//     let startAt_M = parseInt(scheduleData.startAt_M)
//     console.log('0 ' + startAt_M + ' ' + startAt_H + ' * * *')

//     //${startAt_M} ${startAt_H}
//     const scheduleExpression = `0 ${startAt_M} ${startAt_H} * * *`
//     var task = cron.schedule(scheduleExpression, () => {
//         console.log(scheduleData)
//         io.emit('receive_message', scheduleData)
//         // task.stop()
//     }, {
//         scheduled: true,
//     });
//     task.start()
// }


// const cronJob = async (io) => {
//     (async () => {
//         let scheduleData = await ScheduleModel.findOne({ active: true });
//         let startAt_H = scheduleData.startAt_H;
//         let startAt_M = scheduleData.startAt_M;

//         console.log('0 ' + startAt_M + ' ' + startAt_H + ' * * *');

//         const scheduleExpression = `0 ${startAt_M} ${startAt_H} * * *`;

//         var task = cron.schedule(scheduleExpression, () => {
//             console.log(scheduleData);
//             io.emit('receive_message', scheduleData);
//             // task.stop()
//         }, {
//             scheduled: true,
//         });
//         task.start();
//     })();
// };


const checkAlarm = async () => {
    let result = false
    let scheduleData = await ScheduleModel.find({ active: true })
    let currentTime = new Date()
    let currentSeconds = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60
    // console.log('current=', currentTime.getHours(), currentTime.getMinutes(), currentSeconds)
    if (scheduleData.length > 0) {
        scheduleData.forEach(element => {
            let startSeconds = Number(element.startAt_H) * 3600 + Number(element.startAt_M) * 60
            // console.log('start=', element.startAt_H, element.startAt_M, startSeconds)
            let endSeconds = startSeconds + 60 * (element.duration - 1)
            // console.log('end=', endSeconds)
            if (startSeconds <= currentSeconds && currentSeconds <= endSeconds) {
                result = {
                    status: true,
                    schedule: element
                }
            } else {
                result = {
                    status: false
                }
            }
        });
    } else {
        result = {
            status: false
        }
    }
    return result
}

module.exports = {
    cronJob
}