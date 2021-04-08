'use strict';

describe('Airport', function(){
  var airport;
  var plane;
  var plane2;

  beforeEach(function(){
    airport = new Airport();
    plane = jasmine.createSpy('plane',['land']);
    plane2 = jasmine.createSpy('plane',['land']);
  });
  it('has no planes by default', function(){
    expect(airport.planes()).toEqual([]);
  });
  it('can clear planes for landing', function(){
    airport.clearForLanding(plane);
    expect(airport.planes()).toEqual([plane]);
  });
  it('can clear planes for takeoff', function(){
    airport.clearForLanding(plane);
    airport.clearForTakeOff(plane);
    expect(airport.planes()).toEqual([]);
  });
  it('can clear planes for takeoff', function(){
    airport.clearForLanding(plane);
    airport.clearForLanding(plane2);
    airport.clearForTakeOff(plane2);
    expect(airport.planes()).not.toContain([plane2]);
    expect(airport.planes()).toEqual([plane]);
  });
  it('can check for stormy conditions', function(){
    expect(airport.isStormy()).toBeFalsy();
  });
  describe('under stormy conditions',function(){

    it('blocks takeoff when weather is stormy', function(){
      spyOn(Math,'random').and.returnValue(0);
      plane.land(airport)
      spyOn(airport._weather,'isStormy').and.returnValue(true);
      expect(function(){ plane.takeoff();}).toThrowError('cannot takeoff during storm');
      expect(airport.planes()).toContain(plane);
    });

    it('blocks landing when weather is stormy', function(){
      spyOn(Math,'random').and.returnValue(1);
      expect(function(){ plane.land(airport); }).toThrowError('cannot land during storm');
      expect(airport.planes()).toEqual([]);
    });
  });
});