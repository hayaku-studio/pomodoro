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
}
