//
//  UtilsRiveTests.swift
//  Whimsical Pomodoro TimerTests
//
//  Created by David Speers on 17/11/2023.
//

import XCTest
@testable import Whimsical_Pomodoro_Timer

final class UtilsRiveTests: XCTestCase {
    let magnificationFactor = 15

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testTime0() throws {
        let timeMinutesToExpectedMagnificationFactor: [Int: Int] = [
            0: 100,
            1: 100-1*magnificationFactor,
            3: 100-3*magnificationFactor,
            5: 100-5*magnificationFactor,
            10: 100-10*magnificationFactor,
            19: 100-6*magnificationFactor,
            21: 100-4*magnificationFactor,
            23: 100-2*magnificationFactor,
            25: 100
        ]

        for (input, expectedOutput) in timeMinutesToExpectedMagnificationFactor {
            XCTAssertEqual(Int(getMagnificationFactor(timeToMagnify: TimeToMagnify.time0, timeMinutes: Float(input))), expectedOutput)
        }
    }
    
    func testTime10() throws {
        let timeMinutesToExpectedMagnificationFactor: [Int: Int] = [
            0: 100-10*magnificationFactor,
            4: 100-6*magnificationFactor,
            6: 100-4*magnificationFactor,
            8: 100-2*magnificationFactor,
            10: 100,
            11: 100-1*magnificationFactor,
            13: 100-3*magnificationFactor,
            15: 100-5*magnificationFactor,
            35: 100
        ]

        for (input, expectedOutput) in timeMinutesToExpectedMagnificationFactor {
            XCTAssertEqual(Int(getMagnificationFactor(timeToMagnify: TimeToMagnify.time10, timeMinutes: Float(input))), expectedOutput)
        }
    }
    
    func testTime15() throws {
        let timeMinutesToExpectedMagnificationFactor: [Int: Int] = [
            5: 100-10*magnificationFactor,
            9: 100-6*magnificationFactor,
            11: 100-4*magnificationFactor,
            13: 100-2*magnificationFactor,
            15: 100,
            16: 100-1*magnificationFactor,
            18: 100-3*magnificationFactor,
            20: 100-5*magnificationFactor,
            40: 100
        ]

        for (input, expectedOutput) in timeMinutesToExpectedMagnificationFactor {
            XCTAssertEqual(Int(getMagnificationFactor(timeToMagnify: TimeToMagnify.time15, timeMinutes: Float(input))), expectedOutput)
        }
    }
}
