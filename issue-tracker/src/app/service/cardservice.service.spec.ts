import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardService } from './cardservice.service';

describe('CardserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CardService = TestBed.get(CardService);
    expect(service).toBeTruthy();
  });
});
